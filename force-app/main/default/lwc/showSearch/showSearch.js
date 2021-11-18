import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import searchShows from '@salesforce/apex/ShowController.searchShows';
export default class ShowSearch extends NavigationMixin(LightningElement) {
	searchTerm = '';
    shows;
	isModalOpen = false;
	selectedShowId;

    @wire(searchShows, {searchTerm: '$searchTerm'})
    loadShows(result) {
      this.shows = result;
    }
	handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.shows.data.length > 0);
	}
    handleShowView(event) {
		const showId = event.detail;
		this[NavigationMixin.Navigate]({
			type: "comm__namedPage",
            attributes: {
                name: "tv_show_details__c",
            },
            state: {
                id: showId
            },
		});
	}
    handleShowEdit(event) {
		this.selectedShowId = event.detail;
		this.isModalOpen = true;
	}
    handleCloseModal(event) {
		this.isModalOpen = false;
		this.selectedShowId = null;
	}
}