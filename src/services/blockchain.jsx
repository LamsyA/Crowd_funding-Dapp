import abi from '../abis/src/contracts/Crow.sol/Crow.json'
import address from "../abis/contractAddress.json"
import { getGlobalState, setGlobalState } from '../store'
import { ethers } from 'ethers'

const {ethereum} = window
const contractAddress = address.address
const contractAbi = abi.abi

const connectWallet = async () => {
    try{
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    } catch (error) {
        reportError(error)
    }
}

const isWalletConnected = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    
        window.ethereum.on('chainChanged', (chainId) => {
          window.location.reload()
        })
    
        window.ethereum.on('accountsChanged', async () => {
          setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
          await isWalletConnected()
        })
    
        if (accounts.length) {
          setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
        } else {
          alert('Please connect wallet.')
          console.log('No accounts found.')
        }
      } catch (error) {
        reportError(error)
      }
    }


const getContract = async () => {
    const connectedAccount = getGlobalState('connectedAccount')

    if (connectedAccount) {
        const provider =  new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract =  new ethers.Contract(contractAddress, contractAbi, signer)
        return contract
    } else {
        return getGlobalState('contract')
    }

}

    const createNewProject = async ({
        title,
        description,
        imageURL,
        cost,
        expiresAt
        }) => {
    try { 
        if(!ethereum) return alert("Please install Metamask")

        const contract = await getContract()
        cost = ethers.utils.parseEther(cost)
        await contract.createProject(title, description, imageURL,cost, expiresAt)
        
        
    } catch (error) {
        reportError(error)
    }
}


    const updateProjectData = async ({
      id,
      title,
      description,
      imageURL,
      expiresAt
      }) => {
    try { 
      
      
      if(!ethereum) return alert("Please install Metamask")

      const contract = await getContract()
      const t = await contract.updateProject(id, title, description, imageURL, expiresAt)
     
      
    } catch (error) {
      reportError(error)
    }

    }
    const deleteProject = async ({id}) => {
    try { 
      
      if(!ethereum) return alert("Please install Metamask")
      const contract = await getContract()
      await contract.deleteProject(id)
     
      
    } catch (error) {
      reportError(error)
    }

    }

    const listProjects = async () => {
        try {
            if(!ethereum) return alert("Please install Metamask")
            const contract = await getContract()
            const projects = await contract.getProjects() 
            const stats = await contract.stats()
            
            
            setGlobalState('projects', restructuredProjects(projects))
            setGlobalState('stats', restructureStats(stats))
            console.log('Project', restructuredProjects(projects))
            console.log('Stats', restructureStats(stats))
        }catch (error){
            reportError(error)
        }
    }


    const loadProject = async (id) => {
      try {
          if(!ethereum) return alert("Please install Metamask")
          const contract = await getContract()
          const project = await contract.getProject(id)

          setGlobalState('project', restructuredProjects([project])[0])
          console.log('Project :', restructuredProjects(project)[0])
      }catch (error){
          reportError(error)
      }
  }




    const restructuredProjects  = (projects) =>
    projects
      .map((project) => ({
        id: project.id.toNumber(),
        owner: project.owner.toLowerCase(),
        title: project.title,
        description: project.description,
        timestamp: new Date(project.timestamp.toNumber()).getTime(),
        expiresAt: new Date(project.expiresAt.toNumber()).getTime(),
        date: toDate(project.expiresAt.toNumber() * 1000),
        imageURL: project.imageURL,
        raised: parseInt(project.raised._hex) / 10 ** 18,
        cost: parseInt(project.cost._hex) / 10 ** 18,
        backers: project.backers.toNumber(),
        status: project.status,
      }))
      .reverse()

    const toDate = (timestamp) => {
        const date = new Date(timestamp)
        const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
        const mm =
          date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
        const yyyy = date.getFullYear()
        return `${yyyy}-${mm}-${dd}`
      }
      
      const restructureStats = (stats) => ({
        totalProjects: stats.totalProjects.toNumber(),
        totalBacking: stats.totalBacking.toNumber(),
        totalDonations: parseInt(stats.totalDonations._hex) / 10 ** 18,
      })

const reportError = (error) => {
    console.error(error.message)
    // throw new Error("No ethereum object found.")
}

export {
    connectWallet,
    isWalletConnected,
    createNewProject,
    listProjects,
    loadProject,
    updateProjectData,
    deleteProject
    }