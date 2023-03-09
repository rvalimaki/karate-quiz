import {Component, OnInit} from '@angular/core';
import {KarateTerm} from '../models/karate-term.model';
import {KarateTermsService} from '../services/karate-terms.service';

@Component({
    selector: 'app-karate-quiz',
    templateUrl: './karate-quiz.component.html',
    styleUrls: ['./karate-quiz.component.scss']
})
export class KarateQuizComponent implements OnInit {
    karateTerm?: KarateTerm;
    answer?: string;
    errorCount: number = 0;
    score: number = 0;

    displayAnswer = false;

    constructor(private karateTermsService: KarateTermsService) {
    }

    ngOnInit() {
        this.getNextTerm();
    }

    getNextTerm() {
        this.karateTerm = this.karateTermsService.getRandomTerm();
        this.answer = '';
    }

    onSubmit() {
        if (this.checkAnswer()) {
            this.score++;
            this.errorCount = 0;
            this.getNextTerm();
            this.displayAnswer = false;
        } else {
            this.errorCount++;

            if(this.errorCount >= 2) {
                this.displayAnswer = true;
            }

            if (this.errorCount >= 3) {
                this.getNextTerm();
                this.errorCount = 0;
                this.displayAnswer = false;
            }
        }
    }

    checkAnswer(): boolean {
        if (this.karateTerm == null || this.answer == null) return false;

        const userTranslationLower = this.answer.toLowerCase();
        return userTranslationLower.length > 2 && (
            this.karateTerm.english.toLowerCase().includes(userTranslationLower) ||
            this.karateTerm.finnish.toLowerCase().includes(userTranslationLower)
        );
    }
}