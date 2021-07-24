import { LightningElement} from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import conMainObject from '@salesforce/schema/Contact';
import conFirstName from '@salesforce/schema/Contact.FirstName';
import conLastName from '@salesforce/schema/Contact.LastName';
import conPhone from '@salesforce/schema/Contact.Phone';
import conEmail from '@salesforce/schema/Contact.Email';
import conDepartment from '@salesforce/schema/Contact.Department';
import conDescription from '@salesforce/schema/Contact.Description';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    { label: 'First Name', fieldName: 'firstName', type: 'text' },
    { label: 'Last Name', fieldName: 'lastName', type: 'text' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Email', fieldName: 'email', type: 'email' },
    { label: 'Department', fieldName: 'department', type: 'text' },
    { label: 'Description', fieldName: 'description', type: 'text' },
];


export default class customForm extends NavigationMixin(LightningElement) {
    data = [];
    columns = columns;
    firstName = '';
    lastName = '';
    phoneNo= '';
    emailId='';
    departmentVal='';
    descriptionVal='';

    contactChangeVal(event) {        
        if(event.target.label=='First Name'){
            this.firstName = event.target.value;
        }
        if(event.target.label=='Last Name'){
            this.lastName = event.target.value;
        }            
        if(event.target.label=='Phone'){
            this.phoneNo = event.target.value;
        }
        if(event.target.label=='Email'){
            this.emailId = event.target.value;
        }
        if(event.target.label=='Department'){
            this.departmentVal = event.target.value;
        }
        if(event.target.label=='Description'){
            this.descriptionVal = event.target.value;
        }        
        
        
    }


    insertContactAction(){
        console.log(this.selectedAccountId);
        const fields = {};
        fields[conFirstName.fieldApiName] = this.firstName;
        fields[conLastName.fieldApiName] = this.lastName;
        fields[conPhone.fieldApiName] = this.phoneNo;
        fields[conEmail.fieldApiName] = this.emailId;
        fields[conDepartment.fieldApiName] = this.departmentVal;
        fields[conDescription.fieldApiName] = this.descriptionVal;
       console.log(this.fields);
        const recordInput = { apiName: conMainObject.objectApiName, fields };
        createRecord(recordInput)
            .then(contactobj=> {
                this.contactId = contactobj.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact record has been created',
                        variant: 'success',
                    }),
                );
                /*this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: contactobj.id,
                        objectApiName: 'Contact',
                        actionName: 'view'
                    },
                });*/



            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }

}