window.onload = windowIsReady;

function windowIsReady() {
    const canvas = document.createElement('canvas');
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    const context = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 600;

    let counter = 0;
    let quote = "";

    const firstImage = new Image();
    firstImage.crossOrigin = 'anonymous';
    firstImage.src = "https://source.unsplash.com/collection/1130879/300x600";
    firstImage.onload = function () {
        counter++;
        drawContent();
    };

    const secondImage = new Image();
    secondImage.crossOrigin = 'anonymous';
    secondImage.src = "https://source.unsplash.com/collection/1130879/300x290";
    secondImage.onload = function () {
        counter++;
        drawContent();
    };

    const thirdImage = new Image();
    thirdImage.crossOrigin = 'anonymous';
    thirdImage.src = "https://source.unsplash.com/collection/1130879/300x310";
    thirdImage.onload = function () {
        counter++;
        drawContent();
    };

    const requestQuote = new XMLHttpRequest();
    requestQuote.open('GET', "https://thesimpsonsquoteapi.glitch.me/quotes");
    requestQuote.send();
    requestQuote.onload = requestQuoteLoaded;

    function requestQuoteLoaded() {
        const responseObject = JSON.parse(requestQuote.response);
        quote = responseObject[0].quote;
        counter++;
        drawContent();
    }

    function drawBlackout() {
        context.fillStyle = "rgba(0, 0, 0, 0.6)";
        context.fillRect(0, 0, 600, 600);
    }


    function drawContent() {
        if (counter === 4) {
            context.drawImage(firstImage, 0, 0);
            context.drawImage(secondImage, 300, 0);
            context.drawImage(thirdImage, 300, 290);
            context.font = "30px Arial";
            context.strokeStyle = "#ffffff";
            drawBlackout();
            setQuoteOnPicture();
            canvas.onclick = downloadPicture;
        }
    }

    function downloadPicture() {
        const fakeLink = document.createElement('a');
        fakeLink.download = 'canvas.png';
        fakeLink.href = canvas.toDataURL();
        fakeLink.click();
    }

    function setQuoteOnPicture() {
        let words = quote.split(' ');
        let it = 0;
        let current = "";
        let offset = 0;
        while (it < words.length) {
            if ((current.length + words[it].length) * 15 > 550) {
                context.strokeText(current, 50, 270 + offset);
                offset += 30;
                current = words[it] + " ";
            } else {
                current += words[it] + " ";
            }
            it++;
        }
        context.strokeText(current, 50, 270 + offset);
    }
}