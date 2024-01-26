import * as THREE from 'three';
import { PLYLoader } from 'PLYLoader';

document.addEventListener('DOMContentLoaded', function() {
    var loader = new PLYLoader();
    loader.load('../../scene0011_00_vh_clean_2_centered.ply', function(geometry) {
        var vertices = geometry.attributes.position.array;
        var faces = geometry.index.array;
        var colors = geometry.attributes.color.array;

        var data = [{
            type: 'mesh3d',
            x: [],
            y: [],
            z: [],
            i: [],
            j: [],
            k: [],
            vertexcolor: []
        }];


        for (var i = 0; i < vertices.length; i += 3) {
            data[0].x.push(vertices[i]);
            data[0].y.push(vertices[i + 1]);
            data[0].z.push(vertices[i + 2]);


            var r = Math.floor(colors[i] * 255);
            var g = Math.floor(colors[i + 1] * 255);
            var b = Math.floor(colors[i + 2] * 255);
            data[0].vertexcolor.push(`rgb(${r}, ${g}, ${b})`);
        }

        for (var i = 0; i < faces.length; i += 3) {
            data[0].i.push(faces[i]);
            data[0].j.push(faces[i + 1]);
            data[0].k.push(faces[i + 2]);
        }

        var layout = {
            title: '',
            autosize: true,
            margin: {
                l: 0,
                r: 0,
                b: 0,
                t: 0,
                pad: 0
            },
            scene: {
                xaxis: {
                    showgrid: false,
                    zeroline: false,
                    showticklabels: false,
                    title: '',
                    showspikes: false
                },
                yaxis: {
                    showgrid: false,
                    zeroline: false,
                    showticklabels: false,
                    title: '', 
                    showspikes: false
                },
                zaxis: {
                    showgrid: false,
                    zeroline: false,
                    showticklabels: false,
                    title: '',
                    showspikes: false
                }
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            modeBarButtonsToRemove: ['toImage', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'resetCameraLastSave3d', 'hoverClosest3d', 'orbitRotation', 'tableRotation'],
            showlegend: false, 
            displayModeBar: false,
        };

        Plotly.newPlot('meshPlot', data, layout);
    });
});
