class PaginationHelper {
	constructor(collection, itemsPerPage) {
	this.collection = collection
    this.itemsPerPage=itemsPerPage

	}
	itemCount() {
	// returns the number of items within the entire collection
        return this.collection.length
	}
	pageCount() {
	  return this.collection.length===0? 0 : Math.ceil(this.collection.length/this.itemsPerPage)
	}
	pageItemCount(pageIndex) {
	// returns the number of items on the current page. page_index is zero based.
	// this method should return -1 for pageIndex values that are out of range
    if (pageIndex>Math.floor(this.collection.length/this.itemsPerPage) || pageIndex<0){
      return -1
    } return pageIndex===0 || this.collection.length-(pageIndex*this.itemsPerPage)> this.itemsPerPage ? this.itemsPerPage : this.collection.length- pageIndex*this.itemsPerPage
	}
	pageIndex(itemIndex) {
	if (itemIndex>this.collection.length || itemIndex<0){
        return -1
    } return itemIndex ===0 || itemIndex<this.itemsPerPage? 0 : Math.floor((itemIndex-1)/this.itemsPerPage)
    }
}

var helper = new PaginationHelper([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 10)
console.log(helper.pageCount())
console.log(helper.itemCount())
console.log(helper.pageItemCount(0))
console.log(helper.pageItemCount(1))
console.log(helper.pageItemCount(2))
console.log(helper.pageIndex(5))
console.log(helper.pageIndex(2))
console.log(helper.pageIndex(18))
console.log(helper.pageIndex(-10))
