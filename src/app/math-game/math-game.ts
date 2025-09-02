import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface Question {
    num1: number;
    num2: number;
    operator: string;
    answer: number;
}

@Component({
    selector: 'app-math-game',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './math-game.html',
    styleUrl: './math-game.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MathGameComponent {
    answerControl = new FormControl<number | null>(null, [Validators.required]);

    correctCount = signal(0);
    incorrectCount = signal(0);
    hiScore = signal(0);
    hiScoreTotal = signal(0);
    currentQuestion = signal<Question>(this.generateQuestion());
    feedback = signal<string>('Answer');
    showFeedback = signal(false);

    totalQuestions = computed(() => this.correctCount() + this.incorrectCount());
    hiScorePercentage = computed(() => {
        const total = this.hiScoreTotal();
        return total > 0 ? Math.round((this.hiScore() / total) * 100) : 0;
    });

    generateQuestion(): Question {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        const operators = ['+', '-', '×'];
        const operator = operators[Math.floor(Math.random() * operators.length)];

        let answer: number;
        switch (operator) {
            case '+': answer = num1 + num2; break;
            case '-': answer = num1 - num2; break;
            case '×': answer = num1 * num2; break;
            default: answer = 0;
        }

        return { num1, num2, operator, answer };
    }

    onSubmit(): void {
        if (this.answerControl.invalid || this.showFeedback()) return;

        const userAnswer = this.answerControl.value!;
        const isCorrect = userAnswer === this.currentQuestion().answer;

        if (isCorrect) {
            this.correctCount.update(count => count + 1);
            const correctMessages = ['Correct!', 'Sharp!', 'Nice!', 'You Sabi!'];
            this.feedback.set(correctMessages[Math.floor(Math.random() * correctMessages.length)]);
        } else {
            this.incorrectCount.update(count => count + 1);
            this.feedback.set('Wrong!');
        }

        this.showFeedback.set(true);

        setTimeout(() => {
            this.showFeedback.set(false);
            this.feedback.set('Answer');
            this.currentQuestion.set(this.generateQuestion());
            this.answerControl.reset();
        }, 2000);
    }

    resetGame(): void {
        // Update high score if current percentage is better
        const currentCorrect = this.correctCount();
        const currentTotal = this.totalQuestions();
        const currentPercentage = currentTotal > 0 ? (currentCorrect / currentTotal) : 0;
        const hiScorePercentage = this.hiScoreTotal() > 0 ? (this.hiScore() / this.hiScoreTotal()) : 0;
        
        if (currentTotal > 0 && currentPercentage > hiScorePercentage) {
            this.hiScore.set(currentCorrect);
            this.hiScoreTotal.set(currentTotal);
        }
        
        this.correctCount.set(0);
        this.incorrectCount.set(0);
        this.currentQuestion.set(this.generateQuestion());
        this.answerControl.reset();
        this.feedback.set('Answer');
        this.showFeedback.set(false);
    }
}