const tf = require('@tensorflow/tfjs');
require("@tensorflow/tfjs-node");
const iris = require('./iris.json');
const irisTesting = require('./testingIris.json');


// convert data
const trainingData = tf.tensor2d(iris.map(item => [
    item.sepal_length, item.sepal_width, item.petal_length, item.petal_width
]));

const outputData = tf.tensor2d(iris.map(item => [
    item.species === 'setosa' ? 1 : 0,
    item.species === 'virginica' ? 1 : 0,
    item.species === 'versicolor' ? 1 : 0

]));

const testingData = tf.tensor2d(irisTesting.map(item => [
    item.sepal_length, item.sepal_width, item.petal_length, item.petal_width
]
));

// creating model
const model = tf.sequential();
model.add(tf.layers.dense({
    inputShape: [4],
    activation: 'sigmoid',
    units: 5
}));
model.add(tf.layers.dense({
    inputShape: [5],
    activation: 'sigmoid',
    units: 3
}));
model.add(tf.layers.dense({
    activation: 'sigmoid',
    units: 3
}));
// compiling model
model.compile({
    loss: 'meanSquaredError',
    optimizer: tf.train.adam(0.06)
})

const starTime = Date.now();
model.fit(trainingData, outputData, { epochs: 100 }).then((history) => {
    console.log('done!', Date.now() - starTime);
    console.log(history);
    model.predict(testingData).print();
});
// predicting model