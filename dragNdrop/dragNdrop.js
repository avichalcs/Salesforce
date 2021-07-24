import { LightningElement } from 'lwc';

export default class dragNdrop extends LightningElement {

    drag(event){
        event.dataTransfer.setData("divId", event.target.id);
        console.log("drag"+event.target.id)
    }

    allowDrop(event){
        event.preventDefault();
    }

    drop(event){
        event.preventDefault();
        var divId = event.dataTransfer.getData("divId");
        var draggedElement = this.template.querySelector('#' +divId);
        draggedElement.classList.add('completed'); 
        event.target.appendChild(draggedElement);
    }
}