export function rowSelectionHandler(field, item = null) {
    // find entries by user-row class and set font weight to normal
    // for (
    //     let i = 0;
    //     i < document.getElementsByClassName("item-row").length;
    //     i++
    // ) {
    //     document.getElementsByClassName("item-row")[
    //         i
    //     ].style.fontWeight = "normal";
    // }

    // if (item) {
    //     const rows = document.getElementsByClassName("item-row");

    //     for (let i = 0; i < rows.length; i++) {
    //         const row = rows[i];
            
    //         let itemIndex = -1;

    //         const headers = document.getElementsByClassName("item-table")[0]
    //             .getElementsByTagName("th");


    //         for (let j = 0; j < headers.length; j++) {
    //             if (headers[j].innerText.replace(/\s/g, "") === field) {
    //                 itemIndex = j;
    //                 break;
    //             }
    //         }

    //         const indexData = row
    //             .getElementsByTagName("td")[itemIndex]
    //             .textContent.trim();

    //         if (indexData === item.field) {
    //             row.style.fontWeight = "bold";
    //         } else {
    //             row.style.fontWeight = "normal"; // Reset font weight for non-selected rows
    //         }
    //     }
    // }
}

