import { makeAutoObservable } from "mobx";

interface AlertDialog {
  isVisible?: boolean;
  title?: string;
  content: string;
}

export class PanelsStore {
  // Trạng thái dialog
  alertDialog: AlertDialog = {
    isVisible: false,
    title: "",
    content: "",
  };

  // Trạng thái loading
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this); // Tự động quan sát tất cả các thuộc tính và phương thức
  }

  // Hàm hiển thị dialog
  showAlertDialog(alertDialog: AlertDialog) {
    this.alertDialog = {
      ...alertDialog,
      isVisible: true,
    };
  }

  // Hàm ẩn dialog
  hideAlertDialog() {
    this.alertDialog = {
      isVisible: false,
      title: "",
      content: "",
    };
  }

  // Hàm bật/tắt loading
  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}

// Export một instance duy nhất của store
export const panelsStore = new PanelsStore();
