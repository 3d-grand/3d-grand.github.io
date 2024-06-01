function handleDropdownChange() {
    var dropdown = document.getElementById("capability-dropdown");
    var selectedValue = dropdown.options[dropdown.selectedIndex].value;
  
    if (selectedValue === 'captioning') {
      populateDemo('scannet');
    }
    // Add any other necessary logic for other options here
  }
  
function populateDemo(dataset) {
    console.log("dataset", dataset);

    var img1 = document.getElementById("scene1");
    img1.onclick = null;

    var img2 = document.getElementById("scene2");
    img2.onclick = null;

    var img3 = document.getElementById("scene3");
    img3.onclick = null;

    for (const idx of [1, 2, 3, 4, 5]) {
        var instruction = document.getElementById("instruction" + idx);
        var response = document.getElementById("response" + idx);
        instruction.innerHTML = "";
        response.innerHTML = "";
    }

    model1 = scene1.getObjectByName("mesh");
    scene1.remove(model1);
    document.querySelector('#pose_loading').innerHTML = `<img src="assets/loading.svg" width="48" height="48">`;

    var capability = document.querySelector('input[name="capability"]:checked').value;
    //let assetUrl = new URL('./assets/scenes/' + capability + '-' + dataset + '.glb', document.URL);
    let assetUrl = new URL('./assets/scenes/scannet.glb', document.URL);
    assetLoader1.load(assetUrl.href, (gltf) => {
        model1 = gltf.scene;
        model1.name = "mesh";
        scene1.add(model1);
        document.querySelector('#pose_loading').innerHTML = '';

        img1.onclick = function () { populateDemo('scannet'); };
        img2.onclick = function () { populateDemo('3dfront'); };
        img3.onclick = function () { populateDemo('structured3d'); };

        for (var timeoutId of timeoutIds) {
            clearTimeout(timeoutId);
        }
        var delay = 0;
        var qa = getSelectedScene().split('[sep]');
        console.log(qa)
        var idx = 0
        for (var i = 0; i < qa.length; i++) {
            var q = qa[i];
            var a = qa[++i];
            idx += 1;
            displayDialogue(q, a, idx);
        }
    }, undefined, (error) => { console.error(error) });
}

// Removed the typeWriter function as it's no longer needed

function displayDialogue(q, a, idx) {
  var instruction = document.getElementById("instruction" + idx);
  var response = document.getElementById("response" + idx);
  instruction.innerHTML = q; // Display the question
  response.innerHTML = a; // Display the answer directly
}

function getSelectedScene() {
  var radios = document.getElementsByName('scene');

  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return null;
}