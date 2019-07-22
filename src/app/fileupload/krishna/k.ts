additionalParameters: { entityName: any; eventName: any; incidentId: any; };

@Input() config: any;
@Input() url: any = 'safety/incidentreports/uploadmedicaldoc';
@Input() eventName: any = 'addAttachments';
@Input() medicalReportId: any = '';
@Input() itemAlias: any;
public uploader: FileUploader;
public hasBaseDropZoneOver = false;
public hasAnotherDropZoneOver = false;
public description: any = '';
public fileData: any = [];
constructor(public oauthService: OauthService, private reportIncidentService: ReportIncidentService) {
}

public fileOverBase(e: any): void {
  this.hasBaseDropZoneOver = e;
}

public fileOverAnother(e: any): void {
  this.hasAnotherDropZoneOver = e;
}

fileUpload(item) {
  this.additionalParameters['description'] = this.description;
  item.upload();
}
ngOnInit() {

  const data = this.reportIncidentService.getData();
  this.fileData = data['nearMissFileData'];

  if (this.itemAlias != 'document') {
    this.itemAlias = 'medicaldoc';
  }
  this.eventName = (this.eventName) ? this.eventName : 'addAttachments';
  this.url = (this.url) ? this.url : 'safety/incidentreports/uploadmedicaldoc';
  this.url = AppSettings.BASE_URL + this.url;
  this.additionalParameters = {
    entityName: this.eventName,
    eventName: this.eventName,
    incidentId: this.config.incidentId
  };
  if (this.medicalReportId) {
    this.additionalParameters['medicalReportId'] = this.medicalReportId;
  }
  const token = this.oauthService.getAuthDataFromStorage();
  this.uploader = new FileUploader({
    url: this.url,
    additionalParameter: this.additionalParameters,
    headers: [{
      name: 'Authorization',
      value: token.accessToken,
    }],
    itemAlias: this.itemAlias,
  });

  this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    if (response && response != null && response != undefined) {
      
      const _remove = response.split("_");
      const fileName = _remove[_remove.length - 1];
      const extension = fileName.split('.').pop();
      const resTxt=response.split("/");
      const data = {
        fullpath: response,
        fileName: fileName,
        icon:extension
      }
      this.fileData.push(data);
      this.reportIncidentService.setData('nearMissFileData', this.fileData);
    }
  }
}
