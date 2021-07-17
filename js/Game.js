class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }
  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }



  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100, 200);
    car1.addImage(car1Img);

    car2 = createSprite(300, 200);
    car2.addImage(car2Img);

    car3 = createSprite(500, 200);
    car3.addImage(car3Img);

    car4 = createSprite(700, 200);
    car4.addImage(car4Img);

    cars = [car1, car2, car3, car4];
  }

  play() {
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if (allPlayers !== undefined) {
      //var display_position = 100;
      background("#c68767");
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;
      image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);


      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y;
        }
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 10
      player.update();
      console.log(player.distance);
    }

    if (player.distance > 4410) {
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
    }

    drawSprites();
  }
  end() {
    console.log("GAME OVER");
    console.log(player.name);
    console.log(player.rank);

  }

  displayRanks() {
    background(endBack);
    camera.position.y = 0;
    camera.position.x = 0;
    Player.getPlayerInfo();
    imageMode(CENTER);
    image(bronzeImg, displayWidth / -4, -100 + displayHeight / 9, 200, 240);
    image(silverImg, displayWidth / 4, -100 + displayHeight / 10, 225, 270);
    image(goldImg, 0, -100, 250, 300);
    textAlign(CENTER);
    textSize(50)
   

    for (var plr in allPlayers) {
      if (allPlayers[plr].rank === 1) {
        text("FIRST:" + allPlayers[plr].name, 0, 85);
      }
      else if (allPlayers[plr].rank === 2) {
        text("SECOND:" + allPlayers[plr].name, displayWidth / 4, displayHeight / 9 + 73);
      }
      else if (allPlayers[plr].rank === 3) {
        text("THIRD:" + allPlayers[plr].name, displayWidth / -4, displayHeight / 10 + 76);
      }
      else {
        text("HONORABLE MENTION:" + allPlayers[plr].name, 0, 225);
      }
    }
  }
}


    // allPlayers=[{player1.name:X,player1.rank:1},{player2.name:Y,player2.rank:3},{player3.name:Z,player3.rank:2},{player4.name:A,player4.rank:4}]
    // plr=index of allPlayers array 
    // plr=0 =>player1
    // plr=1 => player2


    // var person=["Ammoditaa","purple"]
