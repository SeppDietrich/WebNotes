function savefile(){
    let note =document.getElementById("data");
    let fileName ="Note.txt";
    let data =note.value;
    let strType= "text/plain";
    download(data, fileName, strType);
   
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
