import win32com.client
from openpyxl import Workbook
from datetime import datetime

def find_pst_folder(OutlookObj, pst_filepath):
    for Store in OutlookObj.Stores:
        if Store.IsDataFileStore and Store.FilePath == pst_filepath:
            return Store.GetRootFolder()
    return None

def enumerate_folders(FolderObj, ws):
    for ChildFolder in FolderObj.Folders:
        enumerate_folders(ChildFolder, ws)
    iterate_messages(FolderObj, ws)

def iterate_messages(FolderObj, ws):
    for item in FolderObj.Items:
        sent_on = item.SentOn
        if sent_on is not None:
            sent_on = sent_on.replace(tzinfo=None)
        
        to_field = item.To if item.To is not None else ""
        cc_field = item.CC if item.CC is not None else ""
        bcc_field = item.BCC if item.BCC is not None else ""

        ws.append([
            item.SenderName,
            sent_on,
            to_field,
            cc_field,
            bcc_field,
            item.Subject
        ])

# Create a new Excel workbook and worksheet
wb = Workbook()
ws = wb.active
ws.title = "Email Data"

# Add headers to the worksheet
ws.append(["Sender Name", "Sent On", "To", "CC", "BCC", "Subject"])

Outlook = win32com.client.Dispatch("Outlook.Application").GetNamespace("MAPI")

pst = r"C:\Users\tko20\OneDrive\Documents\Outlook Files\backup.pst"
Outlook.AddStore(pst)
PSTFolderObj = find_pst_folder(Outlook, pst)
try:
    enumerate_folders(PSTFolderObj, ws)
except Exception as exc:
    print(exc)
finally:
    Outlook.RemoveStore(PSTFolderObj)

# Save the workbook
wb.save("email_data.xlsx")
