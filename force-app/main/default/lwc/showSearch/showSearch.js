import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import searchShows from '@salesforce/apex/ShowController.searchShows';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ShowSearch extends NavigationMixin(LightningElement) {
	searchTerm = '';
    shows;
	viewAllDisabled = false;
	isModalOpen = false;
	selectedShowId;

	isModalNewOpen = false;
	newObjectFields;

    loadShows(isAll) {
    	searchShows({searchTerm: this.searchTerm, all: isAll})
			.then((result) => {
				console.log(result);
				this.shows = result;
			})
			.catch(error => {
				this.dispatchEvent(
					new ShowToastEvent({
						title: 'Error get records',
						message: error.body.message,
						variant: 'error'
					})
				);
			});
    }

	connectedCallback() {
		this.loadShows(false);
	}

	handleSearchTermChange(event) {
		this.viewAllDisabled = false;
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
			this.loadShows(false);
		}, 300);
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
		this.loadShows(false);
	}
	handleAddNewShowClick(event) {
        this.isModalNewOpen = true;
        this.newObjectFields = [
            { name: "Name"},
            { name: "Genre__c"},
            { name: "Creator__c"},
            { name: "Country__c"},
            { name: "Release_Year__c"},
            { name: "Description__c"},
            { name: "Logo_URL__c"},
            { name: "Trailer_URL__c"},
            { name: "Featured__c"},
        ];
    }
	handleCloseNewModal(event) {
		this.isModalNewOpen = false;
		this.loadShows(false);
	}
	handleViewAllClick(event) {
		this.loadShows(true);
		this.viewAllDisabled = true;
	}
	handleRefresh(event) {
		this.loadShows(false);
	}
	get hasResults() {
		return (this.shows.length > 0);
	}
}