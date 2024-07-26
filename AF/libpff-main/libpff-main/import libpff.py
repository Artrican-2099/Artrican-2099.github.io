import win32com.client

def find_pst_folder(OutlookObj, pst_filepath) :
    for Store in OutlookObj.Stores :
        if Store.IsDataFileStore and Store.FilePath == pst_filepath :
            return Store.GetRootFolder()
    return None

def enumerate_folders(FolderObj) :
    for ChildFolder in FolderObj.Folders :
        enumerate_folders(ChildFolder)
    iterate_messages(FolderObj)

def iterate_messages(FolderObj) :
    red = 0
    for item in FolderObj.Items :
        print("***************************************")
        print(red)
        print(item.SenderName)
        #print(item.SenderEmailAddress)
        print(item.SentOn)
        #print(item.To)
        #print(item.CC)
        #print(item.BCC)
        #print(item.Subject)

        #count_attachments = item.Attachments.Count
        #if count_attachments > 0 :
            #for att in range(count_attachments) :
                #print(item.Attachments.Item(att + 1).Filename)
        red = red + 1

Outlook = win32com.client.Dispatch("Outlook.Application").GetNamespace("MAPI")

pst = r"C:\Users\tko20\OneDrive\Documents\Outlook Files\backup.pst"
Outlook.AddStore(pst)
PSTFolderObj = find_pst_folder(Outlook,pst)
try :
    enumerate_folders(PSTFolderObj)
except Exception as exc :
    print(exc)
finally :
    Outlook.RemoveStore(PSTFolderObj)