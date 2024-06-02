import plotly.graph_objects as go
import plotly.io as pio
import open3d as o3d
pio.renderers.default = 'notebook'


def load_pcl(pcl_file):

    # load point cloud
    input_mesh_path = pcl_file
    mesh = o3d.io.read_triangle_mesh(input_mesh_path)
    return mesh

pcl_file = 'assets/scenes/LivingRoom-3973-3d-front.ply'
mesh = load_pcl(pcl_file)
import numpy as np
indices = np.random.randint(1175000, size=100000)
xyz = np.array(mesh.vertices)[indices, :]
rgb = np.array(mesh.vertex_colors)[indices, :] 



fig = go.Figure(data=[go.Scatter3d(
    x = xyz[:, 0],
    y = xyz[:, 1],
    z = xyz[:, 2],
    mode="markers",
    marker=dict(size=3, color=rgb),
)])
fig.show()