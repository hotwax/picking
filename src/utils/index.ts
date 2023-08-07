import { toastController } from '@ionic/vue';
import { DateTime } from "luxon";

// TODO Use separate files for specific utilities

// TODO Remove it when HC APIs are fully REST compliant
const hasError = (response: any) => {
    return !!response.data._ERROR_MESSAGE_ || !!response.data._ERROR_MESSAGE_LIST_;
}

const showToast = async (message: string) => {
    const toast = await toastController
        .create({
          message,
          duration: 3000,
          position: 'top',
        })
      return toast.present();
}

const handleDateTimeInput = (dateTimeValue: any) => {
  // TODO Handle it in a better way
  // Remove timezone and then convert to timestamp
  // Current date time picker picks browser timezone and there is no supprt to change it
  const dateTime = DateTime.fromISO(dateTimeValue, { setZone: true}).toFormat("yyyy-MM-dd'T'HH:mm:ss")
  return DateTime.fromISO(dateTime).toMillis()
}

const getProductIdentificationValue = (productIdentifier: string, product: any) => {

  // handled this case as on page load initially the data is not available, so not to execute furthur code
  // untill product are not available
  if(!Object.keys(product).length) {
    return;
  }

  let value = product[productIdentifier];

  // handling case when product can have either goodIdentifications or identifications
  if(product['goodIdentifications']){ 
    // considered that the goodIdentification will always have values in the format "productIdentifier/value" and there will be no entry like "productIdentifier/"
    const identification = product['goodIdentifications'].find((identification: string) => identification.startsWith(productIdentifier + "/"))
    if(identification) {
      const goodIdentification = identification.split('/')
      value = goodIdentification[1]
    }
  }
  if(product['identifications']){
    const identification = product.identifications.find((identification: any) => {
      return identification.productIdTypeEnumId === productIdentifier
    })
    if(identification){
      value = identification.idValue;
    }
  }

  return value;
}

export { showToast, hasError, handleDateTimeInput, getProductIdentificationValue }
