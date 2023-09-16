import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ADD_FEED_FORM_MODEL } from '../../forms';
import { ConfigService } from 'src/app/services/config.service';
import { ID } from 'appwrite';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html',
  styleUrls: ['./add-feed.component.css'],
})
export class AddFeedComponent {
  form: any = new FormGroup({});
  formFields: FormlyFieldConfig[] = ADD_FEED_FORM_MODEL;

  public error: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private configService: ConfigService,
    private apiService: ApiService,
    private http: HttpClient,
    private alertService: AlertService
  ) {
    this.configService.changeData({ title: 'Add New Source' });
  }

  onSubmit() {
    if (this.form.valid) {
      const data = this.form.value;
      let url = data.url;
      if (url != '') {
        this.apiService
          .functions()
          .createExecution(
            '64fb03620326741c2bdf',
            JSON.stringify({ url: url }),
            false,
            '/',
            'GET'
          )
          .then(
            (resp: any) => {
              if (resp.status == 'completed') {
                var response = JSON.parse(resp.responseBody);
                if (response.status) {
                  let user: any = this.auth.getLocalStorage('user');
                  user = JSON.parse(user);
                  let userId = user.userId;

                  var feed = response.data;
                  let userFeed = {
                    user_id: userId,
                    url: data.url,
                    title: data.name,
                    link: feed.link,
                    author: feed.author || '',
                    description: feed.description || '',
                    image: feed.image || '',
                  };

                  this.apiService
                    .db()
                    .createDocument(
                      environment.database.tech_news,
                      environment.database.collection.feeds,
                      ID.unique(),
                      userFeed
                    )
                    .then(
                      (response) => {
                        if (response) {
                          this.alertService.openSnackBar(
                            'New Source Added',
                            'Close'
                          );
                          this.configService.sidenavData();
                          this.form.reset();

                          this.apiService
                            .functions()
                            .createExecution(
                              '64fc182d8c1515d726d5',
                              JSON.stringify({ url: data.url, userId: userId}),
                              true,
                              '/',
                              'GET'
                            )
                            .then(
                              (resp: any) => {
                                if (resp.status == 'completed') {
                                  this.alertService.openSnackBar(
                                    'New Source Fetched',
                                    'Close'
                                  );
                                }
                              },
                              (err: any) => {
                                console.error(err)
                              }
                            );

                          this.router.navigate(['/user/feeds/' + response.$id]);
                        } else {
                          this.alertService.openSnackBar(
                            'Error in adding new source, Please check your feed url',
                            'Close'
                          );
                        }
                      },
                      (error) => {
                        this.alertService.openSnackBar(
                          'Error in adding new source, Please check your feed url',
                          'Close'
                        );
                      }
                    );
                } else {
                  this.alertService.openSnackBar(response.msg, 'Close');
                }
              } else {
                this.alertService.openSnackBar('Error ', 'Close');
              }
            },
            (err: any) => {
              this.alertService.openSnackBar('Error ' + err, 'Close');
            }
          );
      }
    }
  }
}
