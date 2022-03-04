# Deployment

To prepare the static files for the production server run:

```shell
$ npm run build

[...]

File sizes after gzip:
  366.08 KB  build/static/js/2.c11b0132.chunk.js        
  12.84 KB   build/static/js/main.16f98984.chunk.js           
  1.63 KB    build/static/js/3.a3515e59.chunk.js          
  1.17 KB    build/static/js/runtime-main.a12bf11e.js      
  786 B      build/static/css/2.d0cf84ae.chunk.css             
  591 B      build/static/css/main.05b06bf6.chunk.css

The project was built assuming it is hosted at /.
You can control this with the homepage field in your package.json.
The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build

Find out more about deployment here:
  https://cra.link/deployment 

```

Once the ./build directory has been created the webapp is ready to be deployed.