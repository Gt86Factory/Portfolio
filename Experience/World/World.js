import * as THREE from 'three';
import { EventEmitter } from "events";

import Experience from "../Experience.js";

import Room from "./Room.js";
import Environment from "./Environment.js";
import Controls from "./Controls.js";
import Floor from "./Floor.js";

export default class World extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.ressources = this.experience.ressources;
        this.theme = this.experience.theme;

        this.ressources.on("ready", () => {
        this.environment = new Environment();
        this.room = new Room();
        this.floor = new Floor();
        this.emit("worldready");
        });

        this.theme.on("switch", (theme) => {
            this.switchTheme(theme);
        });
    }

    switchTheme(theme){
       if(this.environment){
        this.environment.switchTheme(theme);
       } 
    }

    

    resize(){

    }

    update() {
        if (this.controls) {
            this.controls.update();
        }
        if (this.room) {
            this.room.update();
        }
    }
}