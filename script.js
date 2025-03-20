const url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';
const options = { method: 'GET', headers: { accept: 'application/json' } };

const textQuote = document.getElementById("textQuote")
const textAuthor = document.getElementById("textAuthor")
const exportInFile = document.getElementById("exportInFile")
const anotherQuoteButton = document.getElementById("anotherQuoteButton")

// fetch and display a new quote when button is clicked
anotherQuoteButton.addEventListener("click", () => {
    const ans = getData()

    ans
        .then(result => result.data)
        .then((result) => { handleData(result) })
        .catch(
            (error) => {
                console.log(error)
            }
        )
})

async function getData() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

// handle and display quote data
function handleData(data) {
    const author = data["author"];
    const quote = data["content"];

    textQuote.innerText = quote;
    textAuthor.innerText = author;
}


// Change background randomly
document.getElementById("changeBgButton").addEventListener("click", function () {
    const images = [
        'images/bg1.jpg',
        'images/bg2.jpg',
        'images/bg3.jpg',
        'images/bg4.jpg'
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.getElementById("body").style.background = `url('${randomImage}') no-repeat center center fixed`;
    document.getElementById("body").style.backgroundSize = "cover";
});


// Implementing copy function
const copyQuoteButton = document.getElementById("copyQuoteButton")

copyQuoteButton.addEventListener("click", () => {
    copyToClipboard();
    copyQuoteButton.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-check' viewBox='0 0 16 16'><path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z'/></svg>";

    setTimeout(() => {
        copyQuoteButton.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-copy' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z'/></svg>"
    }, 500);
});

async function copyToClipboard() {
    const type = "text/plain"
    const clipboardItemData = {
        [type]: `${textQuote.innerText}\n${textAuthor.innerText}`
    }
    const clipboardItem = new ClipboardItem(clipboardItemData)
    await navigator.clipboard.write([clipboardItem])
}

// Exporting a file
exportInFile.addEventListener("click", () => { saveTextAsFile() })

function saveTextAsFile() {
    let text = `${textQuote.innerText}\n${textAuthor.innerText}`;

    let blob = new Blob([text], { type: "text/plain" });

    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "savedText.txt"; // File name

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
}

