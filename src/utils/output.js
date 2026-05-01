function updateOutput1(data) {
  document.getElementById('output1').value =
    '[[' + data.map((row) => row.join()).join('],\n[') + ']]';
}
function updateOutput2(data) {
  document.getElementById('output2').value = data.map((row) => row.join('')).join('\n');
}

export { updateOutput1, updateOutput2 };
