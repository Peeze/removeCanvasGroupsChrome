// Get groupsInfo on options page
const groupsInfo = document.getElementById("groupsInfo");

function saveOptions(groupList) {
    //e.preventDefault();
    chrome.storage.sync.set({
            groups : groupList
        }, function() {
            console.log("Saved data.")
        }
    );
}

// Add input element to "groupsInfo"
function addGroupEntry(groupName, groupId) {
    // Create li element
    var node = document.createElement("LI");
    node.className = "groupInfo";

    // Create input element
    var groupInput = document.createElement("INPUT");
    groupInput.className = "groupInput";
    groupInput.setAttribute("type", "text");
    groupInput.setAttribute("value", groupName);
    groupInput.setAttribute("id", groupId);
    groupInput.onchange = updateList;

    // Append elements to document
    node.appendChild(groupInput);
    groupsInfo.appendChild(node);
}

// Update the HTML ul of inputs and the "groups"
function updateList() {
    // Iterate through HTML list, update "groups"
    let groups = [];
    for (node of groupsInfo.childNodes) {
        if (node.nodeName == "LI") {
            // Append value to "groups"
            if (node.childNodes[0].value != "") {
                groups.push(node.childNodes[0].value);
            }
            // Filter for lastInput id.
            // If not empty, append new lastInput
            if (node.childNodes[0].id == "lastInput") {
                if (node.childNodes[0].value != "") {
                    addGroupEntry("", "lastInput");
                    node.childNodes[0].id = undefined;
                }
            }
            // Remove empty inputs except lastInput
            else if (node.childNodes[0].value == "") {
                node.remove();
            }
        }
    }
    saveOptions(groups);
}

// If stored entries could not be restored
function onError(error) {
    console.error(error.message);
    addGroupEntry("", "lastInput");
}

// Create list from stored entries
function onGot(item) {
    console.log("Loaded data.");
    try {
        // Add input for each group in list
        for (groupName of item.groups) {
            addGroupEntry(groupName, undefined);
        }
    } catch {
        console.error(error.message);
    } finally {
        // Add additional empty input
        addGroupEntry("", "lastInput");
    }
}

// Load saved group list
chrome.storage.sync.get(undefined, onGot);
