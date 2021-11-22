import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getFeaturedShows from '@salesforce/apex/ShowController.getFeaturedShows';
export default class FeaturedShows extends NavigationMixin(LightningElement) {
	searchTerm = '';
    shows;
	isModalOpen = false;
	selectedShowId;

    @wire(getFeaturedShows)
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
    get featuredShows() {
        if (this.shows.data) {
            const res = this.shows.data.map(show => {
                return {
                    id: show.Id,
                    logo: show.Logo_URL__c,
                    title: show.Name,
                    year: show.Release_Year__c
                };
            });
            console.log(res);
            return res;
        }
    }

    get displayFeaturedShows() {
        return (this.shows.data && this.shows.data.length > 0);
    }

    handleCarouselClick(event) {
        const showId = event.target.getAttribute("data-id");
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

    renderedCallback() {
        if(this.displayFeaturedShows) {
            const style = document.createElement('style');
            style.innerText = `c-featured-shows .slds-carousel__content {
                height: 4.5rem;
            }`;
            this.template.querySelector('lightning-carousel-image').appendChild(style);
            
            const styleX = document.createElement('style');
            styleX.innerText = `c-featured-shows .slds-carousel__autoplay {
                visibility: hidden;
            }`;
            this.template.querySelector('lightning-carousel').appendChild(styleX);
        }
    }
}