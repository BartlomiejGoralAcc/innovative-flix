import { LightningElement, api } from 'lwc';
export default class ShowTile extends LightningElement {
	@api show;

    handleOpenRecordClick() {
        const selectEvent = new CustomEvent('showview', {
            detail: this.show.Id
        });
        this.dispatchEvent(selectEvent);
    }
}