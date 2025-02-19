function savefile() {
    const d = new Date();
    let month = d.getMonth() + 1; // Months are zero-indexed
    let day = d.getDate();
    let hour = d.getHours();
    let min = d.getMinutes();
    let timestamp = `${month}/${day}-${hour}:${min}`;
    let defaultFileName = `Note_${timestamp}.txt`;

    console.log(`Generated timestamp: ${timestamp}`);

    const note = document.getElementById("data");
    const body = document.getElementById("body");

    // Create modal for filename input
    body.innerHTML = `
        <div class="hello" style="
            width: 400px; 
            background-color: rgb(245, 169, 62); 
            padding-bottom: 5px; 
            margin: 10px;
            display: flex; 
            flex-direction: column; 
            align-items: center;
            height: 150px; 
            justify-content: center; 
            border-radius: 20px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        ">
            <h1 style="margin: 0; padding: 15px;">Name the File:</h1>
            <input id="filename" type="text" 
                placeholder="${defaultFileName}" 
                value="${defaultFileName}" 
                style="width: 200px; height: 25px; font-size: 20px;" 
            />
        </div>
    `;

    const filenameInput = document.getElementById("filename");

    // Global keyboard listener
    const handleKeydown = (e) => {
        if (e.code === "Enter") {
            const filename = filenameInput.value || defaultFileName;
            const data = note.value || ""; // Fallback if no data is provided
            const fileType = "text/plain";
            body.innerHTML = ' ';
            download(data, filename, fileType);
            cleanup();
            // Remove modal and listener
            
        } else if (e.code === "Escape") {
            // Close modal and remove listener
            cleanup();
        }
    };

    // Attach event listener
    document.addEventListener("keydown", handleKeydown);

    // Cleanup function to remove modal and event listener
    const cleanup = () => {
        body.innerHTML = '';
        document.removeEventListener("keydown", handleKeydown);
    };
}



function sharefile(){
    let data = document.getElementById("data").value;
    navigator.clipboard.writeText(data);
    alert("Copied text ... : "+ data);
}
function updatenote(data){
    document.getElementById("data").value=data;
}
function printFile(file) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const data = event.target.result;
        
        updatenote(data);
    };

    reader.readAsText(file);
}

function loadfile(){
    const input = document.getElementById("load");
    const file = input.files[0];
    
    if (file) {
        printFile(file);
    } else {
        console.log("No file selected");
    }
}

function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);


    if (window.MSBlobBuilder) { 
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } 



    if ('download' in a) { 
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    };



   
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
}
