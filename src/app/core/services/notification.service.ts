import { Injectable } from '@angular/core';
import { TranslatesService } from './translate.service';

declare var alertify: any;

@Injectable()
export class NotificationService {
  private notifier: any = alertify;
  constructor(private transalateService: TranslatesService) {
    alertify.defaults = {
      // dialogs defaults
      autoReset: true,
      basic: false,
      closable: true,
      closableByDimmer: true,
      frameless: false,
      maintainFocus: true, // <== global default not per instance, applies to all dialogs
      maximizable: true,
      modal: true,
      movable: true,
      moveBounded: false,
      overflow: true,
      padding: true,
      pinnable: true,
      pinned: true,
      preventBodyShift: false, // <== global default not per instance, applies to all dialogs
      resizable: true,
      startMaximized: false,
      transition: 'pulse',
      // notifier defaults
      notifier: {
        // auto-dismiss wait time (in seconds)
        delay: 3,
        // default position
        position: 'bottom-right',
        // adds a close button to notifier messages
        closeButton: false,

      },
      // language resources
      glossary: {
        // dialogs default title
        title: this.transalateService.instant('Common.MessageTitle'),
        ok: this.transalateService.instant('Common.btnOk'),
        cancel: this.transalateService.instant('Common.btnCancel')
      },

      // theme settings
      theme: {
        // class name attached to prompt dialog input textbox.
        input: 'ajs-input',
        // class name attached to ok button
        ok: 'ajs-ok',
        // class name attached to cancel button
        cancel: 'ajs-cancel'
      }
    };

  }


  printSuccessMessage(message: string) {
    this.notifier.success(message);
  }

  printErrorMessage(message: string) {
    this.notifier.error(message);
  }

  confirmationDeleteDialog(message: string, okCallback: Function) {
    this.notifier.confirm(message, function (e) {
      if (e) {
        okCallback();
      } else {
      }
    }).set('defaultFocus', 'cancel');
  }
  confirmationSaveDialog(message: string, okCallback: Function) {
    this.notifier.confirm(message, function (e) {
      if (e) {
        okCallback();
      } else {
      }
    }).set('defaultFocus', 'ok');
  }
}
