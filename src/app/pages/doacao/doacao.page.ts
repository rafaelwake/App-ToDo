import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-doacao',
  templateUrl: './doacao.page.html',
  styleUrls: ['./doacao.page.scss'],
})
export class DoacaoPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}
  agradecimento(nome: String) {
    this.navCtrl.navigateForward('doadores/' + nome);
  }

  async fazerDoacao() {
    localStorage.setItem('fezdoacao', 'sim');

    const toast = await this.toastController.create({
      message: 'Doação realizada com sucesso.',
      position: 'top',
      color: 'danger',
      duration: 2000,
    });
    toast.present();
  }
}
