document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", document.getElementById("fileInput").files[0]);

    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
    console.log("Expected Out put here ---->>👉👉 ~> document.getElementById ~> data:  :-> >", data)
        
        document.getElementById("response").value = data;
        document.getElementById("downloadButton").style.display = "block";
        document.getElementById("downloadButton").addEventListener("click", function() {
            const blob = new Blob([data], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "response.txt";
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });
    })
    .catch(error => console.error("Error:", error));
});


