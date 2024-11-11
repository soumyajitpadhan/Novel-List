let novels = [];

// Fetch Novels
function fetchNovels() {
    fetch("https://practice-d1c6c-default-rtdb.firebaseio.com/novels.json")
        .then((res) => res.json())
        .then((data) => {
            novels = data;
            displayNovels(novels);
        })
}

fetchNovels();

// Display Novels
function displayNovels(data) {
    document.querySelector("#novelsTable tbody").innerHTML = "";
    // console.log(data);
    data.forEach((novel) => {
        document.querySelector("#novelsTable tbody").innerHTML += `
            <tr>
                <td>${novel.title}</td>
                <td>${novel.author}</td>
                <td>₹ ${novel.price}</td>
                <td>${novel.release_year}</td>
                <td>${novel.genre}</td>
            </tr>
        `
    })

}

// Filtering Year
document.querySelector("#filter-year").addEventListener('change', filterYear);

function filterYear() {
    let value = document.querySelector("#filter-year").value;
    let filterYear;
    if (value == "all") {
        filterYear = novels;
    }
    else {
        filterYear = novels.filter((novel) => {
            return novel.release_year == value;
        })
    }
    displayNovels(filterYear);
    // console.log(filterYear);
}

// Sort By Price
document.querySelector("#sort-price").addEventListener('change', sortPrice);

function sortPrice() {
    let value = document.querySelector("#sort-price").value;
    let priceSort;
    if (value == 'all') {
        priceSort = novels;
    }
    else if (value == 'htl') {
        priceSort = [...novels].sort((a, b) => {
            return b.price - a.price;
        })
    }
    else if (value == 'lth') {
        priceSort = [...novels].sort((a, b) => {
            return a.price - b.price;
        })
    }
    displayNovels(priceSort);
}

//Search By Title And Author
document.querySelector("#search").addEventListener('input', SearchByTitle);

function SearchByTitle() {
    let searchText = document.querySelector("#search").value.toLowerCase();
    let searchResult = novels.filter((novel) => {
        return novel.title.toLowerCase().includes(searchText) || novel.author.toLowerCase().includes(searchText);
    })
    displayNovels(searchResult);
}