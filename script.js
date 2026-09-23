const documents = [
    {
        name: "test_pattern.dxf",
        url: "https://ettha.github.io/lark_cad/test_data/test_pattern.dxf"
    }
    // ,
    // {
    //     name: "drawing1.dxf",
    //     url: "https://ettha.github.io/lark_cad/test_data/drawing1.dxf"
    // }
];


const documentList = document.getElementById("document-list");
const cadViewer = document.getElementById("cad-viewer");


documentList.innerHTML = "";


documents.forEach(document => {

    const listItem = document.createElement("li");

    const link = document.createElement("a");
    link.href = "#";
    link.textContent = document.name;

    link.onclick = function () {

        const viewerUrl =
            "https://mlightcad.com/embed.html?url="
            + encodeURIComponent(document.url);

        cadViewer.src = viewerUrl;
    };

    listItem.appendChild(link);
    documentList.appendChild(listItem);
});