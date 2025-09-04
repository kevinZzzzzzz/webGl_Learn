export default function (gl) {
    // 创建顶点着色器和片元着色器
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
                
    // 获取着色器源码
    const vertexSource = document.getElementById('vertex-shader').textContent
    const fragmentSource = document.getElementById('fragment-shader').textContent

    // 绑定着色器源码
    gl.shaderSource(vertexShader, vertexSource)
    gl.shaderSource(fragmentShader, fragmentSource)

    // 编译着色器
    gl.compileShader(vertexShader)
    gl.compileShader(fragmentShader)

    // 创建程序
    const program = gl.createProgram()
    // 附加程序
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    // 使用程序
    gl.useProgram(program)

    return program

}