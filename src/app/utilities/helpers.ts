export class Helper {
  removeFromArray(myArray: any[], key: any) {
    const index = myArray.indexOf(key, 0);
    if (index > -1) {
      myArray.splice(index, 1);
    }
  }
}
