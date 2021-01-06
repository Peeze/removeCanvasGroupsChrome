chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({groups: []}, function() {
    console.log("Groups list initialised.");
  });
});