import {Component, OnInit} from '@angular/core';
import {KarateTerm} from '../models/karate-term.model';
import {KarateTermsService} from '../services/karate-terms.service';

let stringSimilarity = require("string-similarity");

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

    previousAnswerCorrectness = '';

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

            if (this.errorCount >= 2) {
                this.displayAnswer = true;
            }

            if (this.errorCount >= 3) {
                this.getNextTerm();
                this.errorCount = 0;
                this.displayAnswer = false;
            }
        }
    }

    trimAnswer(str: string) {
        return str.toLowerCase().replace(/-/g, ' ').trim();
    }

    checkAnswer(): boolean {
        if (this.karateTerm == null || this.answer == null) return false;

        const answer = this.trimAnswer(this.answer);

        const possibleAnswers = this.karateTerm.english.split(',')
            .concat(this.karateTerm.finnish.split(','))
            .map(pa => this.trimAnswer(pa));

        const similarities = possibleAnswers.map(pa => stringSimilarity.compareTwoStrings(answer, pa));

        const bestMatch = Math.max(...similarities);
        this.previousAnswerCorrectness = Math.round(bestMatch * 100) + '%';

        return similarities.some(s => s > 0.75);
    }
}