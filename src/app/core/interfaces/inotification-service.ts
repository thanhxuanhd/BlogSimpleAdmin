export interface INotificationService {
    printSuccessMessage(message: string);
    printErrorMessage(message: string);
    confirmationDeleteDialog(message: string, okCallback: Function);
    confirmationSaveDialog(message: string, okCallback: Function);
}
