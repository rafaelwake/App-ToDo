import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-doacao',
  templateUrl: './doacao.page.html',
  styleUrls: ['./doacao.page.scss'],
})
export class DoacaoPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}
  agradecimento(nome: String) {
    this.navCtrl.navigateForward('doadores/' + nome);
  }
}
