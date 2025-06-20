function generateInvoice() {

    document.getElementById('tiket').style.display = 'flex';
    document.getElementById('bookingInvoice').style.maxWidth = '80%';

    var inputFilm = document.getElementById('film').value;
    var inputRow = document.getElementById('row').value;
    var inputSeat = document.getElementById('seat').value;
    var inputDate = document.getElementById('date').value;
    var inputTime = document.getElementById('time').value;
    const inputPrice = 35000;

    document.getElementById('judulTiket').innerText = inputFilm;
    document.getElementById('dateTiket').innerText = "DATE: " + inputDate;
    document.getElementById('timeTiket').innerText = "TIME: " + inputTime;
    document.getElementById('rowTiket').innerText = "ROW: " + inputRow;
    document.getElementById('seatTiket').innerText = "SEAT: " + inputSeat;
    document.getElementById('priceTiket').innerText = "PRICE: " + inputPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

    var orderID = inputRow + inputSeat + inputDate.replace(/-/g, '') + inputTime.replace(/:/g, '');
    document.getElementById('kodePesanan').innerText = orderID;
}

function cekDenah() {
    document.getElementById('denahDuduk').style.display = 'flex'
}

function kategoriFilm() {
    var kategoriFilm = document.getElementById('kategori');
    var namaKategori = kategoriFilm.value;

    var listFilm = document.getElementById('film');

    listFilm.innerHTML = '<option value="" disabled selected>Pilih Judul Film</option>';

    if (namaKategori === 'Animasi Jepang') {
        var filmList = [
            { value: 'Suzume No Tojimari', text: 'Suzume No Tojimari' },
            { value: 'Tenki No Ko', text: 'Tenki No Ko' },
            { value: 'Kimi No Nawa', text: 'Kimi No Nawa' },
            { value: 'Jujutsu Kaisen 0', text: 'Jujutsu Kaisen 0' },
            { value: 'Haikyuuu: The Dumster Battle', text: 'Haikyuuu: The Dumster Battle' },
            { value: 'Violet Evergarden: The Movie', text: 'Violet Evergarden: The Movie' },
            { value: 'Demon Slayer: Mugen Train', text: 'Demon Slayer: Mugen Train' },
            { value: 'The Boy And The Heron', text: 'The Boy And The Heron' }
        ];
    } else if (namaKategori === 'Film Internasional') {
        var filmList = [
            { value: 'Dune: Part One', text: 'Dune: Part One' },
            { value: 'Dune: Part Two', text: 'Dune: Part Two' },
            { value: 'Fantastic Beast: The Crimes Of Grindelwald', text: 'Fantastic Beast: The Crimes Of Grindelwald' },
            { value: 'Fantastic Beats: The Secret of Dumbeldore', text: 'Fantastic Beats: The Secret of Dumbeldore' },
            { value: 'Exodus: Gods and Kings', text: 'Exodus: Gods and Kings' },
            { value: 'Kingdom of The Planets of The Apes', text: 'Kingdom of The Planets of The Apes' }
        ];
    } else if (namaKategori === 'Film Lokal') {
        var filmList = [
            { value: 'Rembulan Tenggelam Di Wajahmu', text: 'Rembulan Tenggelam Di Wajahmu' },
            { value: 'Agak Laen', text: 'Agak Laen' }
        ];
    } else {
        var filmList = [];
    }

    filmList.forEach(function(film) {
        var opsiFilm = document.createElement('option');
        opsiFilm.value = film.value;
        opsiFilm.textContent = film.text;
        listFilm.appendChild(opsiFilm);
    });
}

