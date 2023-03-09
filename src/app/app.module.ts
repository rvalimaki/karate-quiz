import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {KarateQuizComponent} from './karate-quiz/karate-quiz.component';
import {KarateTermsService} from './services/karate-terms.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [
        AppComponent,
        KarateQuizComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule
    ],
    providers: [
        KarateTermsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
