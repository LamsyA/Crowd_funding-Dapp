//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Crow {
    address public owner;
    uint256 public projectTax;
    uint256 public projectCount;
    uint256 public balance;
    statsStruct public stats;
    projectStruct[] projects;

    mapping(address => projectStruct[]) projectsOf;
    mapping(uint256 => backerStruct[]) backersOf;
    mapping(uint256 => bool) public projectExist;

    enum statusEnum {
        OPEN,
        APPROVED,
        REVERTED,
        DELETED,
        PAIDOUT
    }
    struct statsStruct {
        uint256 totalProjects;
        uint256 totalBacking;
        uint256 totalDonations;
    }
    struct backerStruct {
        address owner;
        uint256 contribution;
        uint256 timestamp;
        bool refunded;
    }
    struct projectStruct {
        uint256 id;
        address owner;
        string title;
        string description;
        string imageURL;
        uint256 cost;
        uint256 raised;
        uint256 timestamp;
        uint256 expiresAt;
        uint256 backers;
        statusEnum status;
    }

    constructor(uint256 _projectTax) {
        owner = msg.sender;
        projectTax = _projectTax;
    }

    event Action(
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    modifier ownerOnly() {
        require(
            msg.sender == owner,
            "Only Owner has the permission, Authorization Reversed"
        );
        _;
    }

    function createProject(
        string memory title,
        string memory description,
        string memory imageURL,
        uint256 cost,
        uint256 expiresAt
    ) public returns (bool) {
        require(bytes(title).length > 0, "Title must be greater than 0");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageURL).length > 0, "Image cannot be empty");
        require(cost > 0 ether, "cost must be greater than 0");
        require(cost > 0 ether, "cost must be greater than 0");

        projectStruct memory project;
        project.id = projectCount;
        project.owner = msg.sender;
        project.title = title;
        project.description = description;
        project.imageURL = imageURL;
        project.cost = cost;
        project.timestamp = block.timestamp;
        project.expiresAt = expiresAt;

        projects.push(project);
        projectExist[projectCount] = true;
        projectsOf[msg.sender].push(project);
        stats.totalProjects += 1;

        emit Action(
            projectCount++,
            "PROJECT CREATED",
            msg.sender,
            block.timestamp
        );
        return true;
    }

    function updateProject(
        uint256 id,
        string memory title,
        string memory description,
        string memory imageURL,
        uint256 expiresAt
    ) public returns (bool) {
        require(msg.sender == projects[id].owner, "Unauthorized");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageURL).length > 0, "Image cannot be empty");

        projects[id].title = title;
        projects[id].description = description;
        projects[id].imageURL = imageURL;
        projects[id].expiresAt = expiresAt;

        emit Action(id, "PROJECT UPDATED", msg.sender, block.timestamp);
        return true;
    }

    function deleteProject(uint256 id) public returns (bool) {
        require(
            msg.sender == projects[id].owner || msg.sender == owner,
            "Unauthorized"
        );
        require(projects[id].status == statusEnum.OPEN, "Project is not open");

        projects[id].status = statusEnum.DELETED;
        performRefund(id);

        emit Action(id, "PROJECT DELETED", msg.sender, block.timestamp);
        return true;
    }

    function performRefund(uint256 id) internal {
        for (uint256 i = 0; i < backersOf[id].length; i++) {
            address _owner = backersOf[id][i].owner;
            uint256 _contribution = backersOf[id][i].contribution;

            backersOf[id][i].refunded = true;
            backersOf[id][i].timestamp = block.timestamp;
            payTo(_owner, _contribution);

            stats.totalBacking -= 1;
            stats.totalDonations -= _contribution;
        }
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function backProject(uint256 id) public payable returns (bool) {
        require(msg.value > 0 ether, "Ether cannot be Zero");
        require(projectExist[id], "Project does not Exist");
        require(projects[id].status == statusEnum.OPEN, "Project Closed");

        stats.totalBacking += 1;
        stats.totalDonations += msg.value;
        projects[id].raised += msg.value;
        projects[id].backers += 1;

        backersOf[id].push(
            backerStruct(msg.sender, msg.value, block.timestamp, false)
        );

        emit Action(id, "PROJECT BACKED", msg.sender, block.timestamp);

        if (projects[id].raised >= projects[id].cost) {
            projects[id].status = statusEnum.APPROVED;
            balance += projects[id].raised;
            performPayout(id);
            return true;
        }

        if (block.timestamp < projects[id].expiresAt) {
            projects[id].status = statusEnum.REVERTED;
            performRefund(id);
            return true;
        }
        return true;
    }

    function performPayout(uint256 id) internal {
        uint256 raised = projects[id].raised;
        uint256 tax = (raised * projectTax) / 100;

        projects[id].status = statusEnum.PAIDOUT;

        payTo(projects[id].owner, (raised - tax));
        payTo(owner, tax);

        balance -= projects[id].raised;

        emit Action(id, "PROJECT PAID OUT", msg.sender, block.timestamp);
    }

    function requestRefund(uint256 id) public returns (bool) {
        require(
            projects[id].status != statusEnum.REVERTED ||
                projects[id].status != statusEnum.DELETED,
            "Project not marked as revert or delete"
        );
        projects[id].status = statusEnum.REVERTED;
        performRefund(id);
        return true;
    }

    function payOutProject(uint256 id) public returns (bool) {
        require(
            projects[id].status == statusEnum.APPROVED,
            "Project no longer APPROVED"
        );
        require(
            msg.sender == projects[id].owner || msg.sender == owner,
            "Unauthorized"
        );

        performPayout(id);
        return true;
    }

    function changeTax(uint256 _taxPct) public ownerOnly {
        projectTax = _taxPct;
    }

    function getProject(uint256 id) public view returns (projectStruct memory) {
        require(projectExist[id], "Project not found");

        return projects[id];
    }

    function getProjects() public view returns (projectStruct[] memory) {
        return projects;
    }

    function getBackers(
        uint256 id
    ) public view returns (backerStruct[] memory) {
        return backersOf[id];
    }
}
