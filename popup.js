document.getElementById("connect").addEventListener("click", (event) => {
    chrome.runtime.sendMessage({
        msg: "User_Requested", 
    });
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "key") {
            var id = request.id;
            var url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + id;
            document.getElementById("qrImage").src = url;
            document.getElementById("qrImage").style.display = "block";

            document.getElementById("confirm").style.display = "block";
            document.getElementById("input_txt").style.display = "block";

            document.getElementById("confirm").addEventListener("click", (event) => {
                chrome.runtime.sendMessage({
                    msg: "input_confirmed",
                    id: id,
                    number: document.getElementById("input_txt").value,
                })
            })
        }
    }
);
