export function rowSelectionHandler(item = null) {
    // find entries by user-row class and set font weight to normal
    for (
        let i = 0;
        i < document.getElementsByClassName("item-row").length;
        i++
    ) {
        document.getElementsByClassName("item-row")[
            i
        ].style.fontWeight = "normal";
    }

    // if item go through all the rows to find which attributes match the item
    if (item) {
        for (
            let i = 0;
            i < document.getElementsByClassName("item-row").length;
            i++
        ) {
            try {
                if (
                    document.getElementsByClassName("item-row")[i].childNodes[0].textContent ===
                    item["id"].toString()
                ) {
                    document.getElementsByClassName("item-row")[i].style.fontWeight = "bold";
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}