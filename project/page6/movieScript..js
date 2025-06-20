function formReview() {
    document.getElementById('reviewFilm').style.display = 'flex';
}

function generateReview() {
    var inputUser = document.getElementById('inputUser').value;
    var inputRating = parseFloat(document.getElementById('rating').value);
    var inputKomentar = document.getElementById('komentar').value;

    var listReview = document.getElementById('listReview');
    var lines = listReview.getElementsByClassName('line');
    var lastLine = lines[lines.length - 1];
    var countReviewItem;

    if (lastLine) {
        countReviewItem = lastLine.getElementsByClassName('reviewItem').length;
    } else {
        countReviewItem = 0;
    }

    if (countReviewItem >= 3 || lines.length === 0) {
        var divLine = document.createElement('div');
        divLine.className = 'line';
        listReview.appendChild(divLine);
        lastLine = divLine;
    }

    var divReviewItem = document.createElement('div');
    divReviewItem.className = 'reviewItem';

    var divItemHeader = document.createElement('div');
    divItemHeader.className = 'itemHeader';
    var ratingFilm = document.createElement('p');
    ratingFilm.innerText = `${inputRating}/10`;
    var imgStar = document.createElement('img');
    imgStar.src = "/aset/star.png";
    imgStar.alt = "star";
    imgStar.style.width = '20px';
    imgStar.style.height = '20px';
    divItemHeader.appendChild(imgStar);
    divItemHeader.appendChild(ratingFilm);

    var divItemKomentar = document.createElement('div');
    divItemKomentar.className = 'itemKomentar';
    var itemKomentar = document.createElement('p');
    itemKomentar.innerText = `"${inputKomentar}"`;
    divItemKomentar.appendChild(itemKomentar);

    var divItemFooter = document.createElement('div');
    divItemFooter.className = 'itemFooter';
    var itemFooter = document.createElement('p');
    itemFooter.innerText = inputUser;
    itemFooter.style.fontStyle = 'italic';
    divItemFooter.appendChild(itemFooter);

    divReviewItem.appendChild(divItemHeader);
    divReviewItem.appendChild(divItemKomentar);
    divReviewItem.appendChild(divItemFooter);

    lastLine.appendChild(divReviewItem);

    document.getElementById('reviewForm').reset();

    document.getElementById('reviewFilm').style.display = 'none';
}
