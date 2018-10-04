export interface INotificationService {
    printSuccessMessage(message: string);
    rintErrorMessage(message: string);
    confirmationDeleteDialog(message: string, okCallback);
    confirmationSaveDialog(message: string, okCallback);
}
