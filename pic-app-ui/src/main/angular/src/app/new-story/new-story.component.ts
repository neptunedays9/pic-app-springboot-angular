import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
//import * as Konva from 'konva';
import * as Konva from 'konva/konva';
import { ELEMENTS, MAN, WOMAN, CHILD, FAMILY, ANIMAL, PLACE, FOOD, FURNITURE, Scene, Element } from './element';
//import {Http, Response} from '@angular/http';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { StoryInfoService } from '../storyinfo.service';
import { StoryService } from '../story.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-story',
  templateUrl: './new-story.component.html',
  styleUrls: ['./new-story.component.css']
})
export class NewStoryComponent implements OnInit {



  //variables
  @ViewChild('picCanvas') picCanvas: ElementRef;

  picstage : any;

  elements = ELEMENTS;
  man = MAN;
  woman = WOMAN;
  child = CHILD;
  family = FAMILY;
  animal = ANIMAL;
  place = PLACE;
  food = FOOD;
  furniture = FURNITURE;

  scenes : Scene [] ;

  storytitle = "A day in ...";
  scenestory = "A bright sunny day ...";
  //email = "pqr@pqr";
  useremail:any = "pqr@pqr";
  username:any = "pqr";

  baseUrl = 'http://localhost:8080/login';
  storyUrl = 'http://localhost:8080/story';

  greeting = {};

  token:string;

  //functions
  constructor(private http: HttpClient, private storyinfoservice: StoryInfoService,
    private storyService:StoryService, private userservice:UserService ) {
    //this.token = this.tokenExtractor.getToken() as string;
  }
  private id: any;
  private loadStory: any;

  getStoryApiWrapper()
  {

  }

  ngOnChanges() {
    console.log("in ngOnChanges");

  }

  idInView = 0;
  ngDoCheck() {
    console.log("in ngDoCheck");
    if(this.id > 0) {
      if(this.loadStory === undefined) {
        //Story not yet loaded
      } else {
        if(this.idInView !== this.id) {
          this.idInView = this.id;
          //load the Stage corresponding to the // ID
          console.log("ngDoCheck this.loadStory", this.loadStory);
          console.log("ngDoCheck this.loadStory.scenes[0].scene", this.loadStory.scenes[0].scene);
          this.storytitle = this.loadStory.title;
          this.scenestory = this.loadStory.scenes[0].story;
          this.picstage = Konva.Node.create(this.loadStory.scenes[0].scene, this.picCanvas.nativeElement);
          this.picstage.find('Image').forEach((imageNode) => {
            const src = imageNode.getAttr('src');
            console.log("forEach imageNode", src);
            const image = new Image();
            image.onload = () => {
              console.log("Adding image");

              imageNode.image(image);
              imageNode.getLayer().batchDraw();
            }
            image.src = src;
          });        }
        }
      }
    }

    ngAfterContentInit() {
      console.log("in ngAfterContentInit");

    }
    stage: any;
    ngOnInit() {

      console.log("in ngOnInit");

      this.storyinfoservice.getId().subscribe(id => this.id = id);
      console.log("in ngOnInit with Id: ", this.id);

      //if the user already selected a story to edit
      if(this.id > 0) {
        //load the Stage corresponding to the // ID
        this.storyService.getStory(this.id).subscribe(data=> {
          console.log("in this.storyService.getStory().subscribe");
          console.log(data);
          this.loadStory = data;
        });
      }

      //if the already selected story details are loaded or not
      if(this.loadStory === undefined) {
        //not yet loaded - create Stage new
        this.picstage = new Konva.Stage({
          container: this.picCanvas.nativeElement,
          width: 950,
          height: 300
        });
      } else {
        //loaded - create Stage from the stored data
        console.log("this.loadStory", this.loadStory);
        console.log("this.loadStory.scenes[0].scene", this.loadStory.scenes[0].scene);
        //this.picstage.destroy();

        this.picstage = Konva.Node.create(this.loadStory.scenes[0].scene, this.picCanvas.nativeElement);
        this.picstage.find('Image').forEach((imageNode) => {
          console.log("forEach imageNode)");
          const src = imageNode.getAttr('src');
          const image = new Image();
          image.onload = () => {
            console.log("Adding image");

            imageNode.image(image);
            imageNode.getLayer().batchDraw();
          }
          image.src = src;
        });
        //       var stage = Konva.Node.create(this.loadStory.scenes[0].scene);
        // //      const attributes = Array.from(this.picstage.find('Image'));
        //       const attributes = Array.from(stage.find('Image'));
        //       attributes.forEach((imageNode) => {
        //           const src = imageNode.getAttr('src');
        //           const image = new Image();
        //           image.onload = () => {
        //               imageNode.setImage(image);
        //               imageNode.getLayer().batchDraw();
        //           }
        //           image.src = src;
        //       });
      }
      this.loadCanvas();
    }

    createCSRFApi() {
      return this.http.get(this.baseUrl).map((res: Response) => res.json())
    }

    createCSRF()
    {
      this.createCSRFApi().subscribe(data=> {
        console.log(data);
      })
    }

    ngAfterViewInit() {
      console.log("in ngAfterViewInit");
      var layer = new Konva.Layer();

      var imageObj = new Image();
      var imageObj1 = new Image();
      imageObj.src = '../assets/img/pics/lady1.png';
      imageObj1.src = '../assets/img/pics/man1.png';

      var yoda = new Konva.Image({
        x: 50,
        y: 50,
        image: imageObj,
        width: 106,
        height: 118,
        draggable: true
      });

      // add the shape to the layer
      layer.add(yoda);

      // add the layer to the stage
      //  this.picstage.add(layer);
    }

    loadCanvas() {
      var layer = new Konva.Layer();

      var imageObj = new Image();
      var imageObj1 = new Image();
      imageObj.src = '../assets/img/pics/lady1.png';
      imageObj1.src = '../assets/img/pics/man1.png';

      var yoda = new Konva.Image({
        x: 50,
        y: 50,
        image: imageObj,
        width: 106,
        height: 118,
        draggable: true
      });

      // add the shape to the layer
      layer.add(yoda);

      // add the layer to the stage
      this.picstage.add(layer);



      var yoda1 = new Konva.Image({
        x: 100,
        y: 100,
        image: imageObj1,
        width: 106,
        height: 118,
        draggable: true
      });

      // add the shape to the layer
      layer.add(yoda1);
      // add the layer to the stage
      this.picstage.add(layer);
    }

    private apiUrl = 'http://localhost:8080/story/add';
    private singleStoryUrl = 'http://localhost:8080/story';

    date = Date();

    httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers': '*',
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
        //'X-XSRF-TOKEN': this.token
      })
    };

    //Save the stage object into JSON
    saveClicked() {
      console.log("in saveClicked");

      var scene1picstage = this.picstage.toJSON();

      //  const sceneObj = {
      //    story: this.scenestory,
      //    scene: scene1picstage
      //  };

      this.scenes = [new Scene(this.scenestory, scene1picstage)];

      //get the logged in user email in email field
      this.userservice.getUserEmail().subscribe(data=> {
        console.log("this.userservice.getUserEmail().subscribe");
        console.log(data);
        this.useremail = data;
      });

      this.userservice.getUserName().subscribe(data=> {
        console.log("this.userservice.getUserName().subscribe");
        console.log(data);
        this.username = data;
      });

      console.log("Email:" + this.useremail);
      console.log("Title:" + this.storytitle);
      console.log("SceneStory:" + this.scenestory);

      const storyObj = {
        title: this.storytitle,
        email: this.useremail,
        scenes: this.scenes
      };

      //const sceneObjStr = JSON.stringify(sceneObj);

      //const allscenesObjStr = JSON.stringify(allscenesObj);

      const storyStr = JSON.stringify(storyObj);

      console.log("Sending", storyStr);

      //Post to backend to store in DB
      if(this.id > 0) {
        //update the existing story
        this.updateStory(storyStr)
        .subscribe(data => {
          console.log("Finished this.updateStory(storyStr)");
          console.log(data);
        });
      } else {
      this.sendStory(storyStr)
      .subscribe(data => {
        console.log("Finished this.sendStory(storyStr)");
        console.log(data);
      });
    }
      //this.http.post<string>(this.apiUrl, storyStr);
    }

    sendStory(article: string): Observable<string> {
      console.log("In sendStory");
      //return this.http.post<string>(this.apiUrl, article);
      return this.http.post<string>(this.apiUrl, article, this.httpOptions)
      .pipe(
        catchError(this.handleError('sendStory', article))
      );
    }

    updateStory(article: string): Observable<string> {
      console.log("In updateStory");
      //return this.http.post<string>(this.apiUrl, article);
      return this.http.post<string>(this.singleStoryUrl + "/" + this.id, article, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateStory', article))
      );
    }

    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.log("handleError error");

        // TODO: send the error to remote logging infrastructure
        console.log("Error" + error); // log to console instead

        // TODO: better job of transforming error for user consumption
        // this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    cancelClicked() {

    }

    testCanvas() {
      var stage = new Konva.Stage({
        container: 'container',
        width: 950,
        height: 300
      });

      var layer = new Konva.Layer();

      var imageObj = new Image();
      imageObj.src = '../assets/img/pics/lady1.png';

      imageObj.onload = function() {

        var yoda = new Konva.Image({
          x: 50,
          y: 50,
          image: imageObj,
          width: 106,
          height: 118,
          draggable: true
        });
        yoda.setAttr('src', imageObj.src);

        // add the shape to the layer
        layer.add(yoda);
        stage.add(layer);
      }
    }

    addElement(element: Element) {
      console.log("addElement", element);

      var layer = new Konva.Layer();

      var _this1 = this;
      var imageObj = new Image();
      imageObj.onload = function(this) {
        var yoda = new Konva.Image({
          x: 250,
          y: 50,
          image: imageObj,
          width: 80,
          height: 80,
          draggable: true
        });
        yoda.setAttr('src', imageObj.src);

        // add the shape to the layer
        layer.add(yoda);

        // add the layer to the stage
        _this1.picstage.add(layer);
        console.log("this.picstage", _this1.picstage);
      };
      imageObj.src = element.getSrc();
    }

  }
