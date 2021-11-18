import { LightningElement, api } from 'lwc';
export default class ShowTile extends LightningElement {
	@api show;

    handleOpenRecordClick() {
        const event = new CustomEvent('showview', {
            detail: this.show.Id
        });
        this.dispatchEvent(event);
    }
    handleEditRecordClick() {
        const event = new CustomEvent('showedit', {
            detail: this.show.Id
        });
        this.dispatchEvent(event);
    }
}