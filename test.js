this.stepProcess = function(i, j, id) {
  this.setValue(i, j, id);

  var c = 0;
  var p2;
  var p1;

  if (id == 1)
  {
    p1 = 1;
    p2 = 2;
  }
  else
  {
    p1 = 2;
    p2 = 1;
  }

  for (var x = 1; x <= 8; x = (x + 1))
  {
    if (this.matrix[(i + x)][j] == 0) {
      break;
    }
    if (this.matrix[(i + x)][j] == p2)
    {
      c = (c + 1);
      if (this.matrix[(i + x + 1)][j] == p1)
      {
        while (c > 0)
        {
          this.setValue((i + x - c + 1), j, p1);
          c = (c - 1);
        }
      }
    }
  }

  c = 0;

  for (var x = 1; x <= 8; x = (x + 1))
  {
    if (x > i) {
      break;
    }
    if (this.matrix[(i - x)][j] == 0) {
      break;
    }
    if (this.matrix[(i - x)][j] == p2)
    {
      c = c + 1;
      if (this.matrix[(i - x - 1)][j] == p1)
      {
        while (c > 0)
        {
          this.setValue((i - x + c - 1), j, p1);
          c = (c - 1);
        }
      }
    }
  }

  c = 0;

  for (var x = 1; x <= 8; x = (x + 1))
  {
    if (this.matrix[i][(j + x)] == 0) {
      break;
    }
    if (this.matrix[i][(j + x)] == p2)
    {
      c = (c + 1);
      if (this.matrix[i][(j + x + 1)] == p1)
      {
        while (c > 0)
        {
          this.setValue(i, (j + x - c + 1), p1);
          c = (c - 1);
        }
      }
    }
  }

  c = 0;

  for (var x = 1; x <= 8; x = (x + 1))
  {
    if (x > j) {
      break;
    }
    if (this.matrix[i][(j - x)] == 0) {
      break;
    }
    if (this.matrix[i][(j - x)] == p2)
    {
      c = (c + 1);
      if (this.matrix[i][(j - x - 1)] == p1)
      {
        while (c > 0)
        {
          this.setValue(i, (j - x + c - 1), p1);
          c = (c - 1);
        }
      }
    }
  }

  c = 0;

  for (var x = 1; x <= 8; x = (x + 1))
  {
    if (this.matrix[(i + x)][(j + x)] == 0) {
      break;
    }
    if (this.matrix[(i + x)][(j + x)] == p2)
    {
      c = (c + 1);
      if (this.matrix[(i + x + 1)][(j + x + 1)] == p1)
      {
        while (c > 0)
        {
          this.setValue((i + x - c + 1), (j + x - c + 1), p1);
          c = (c - 1);
        }
      }
    }
  }

  c = 0;

  for (var x = 1; x <= 8; x = (x + 1))
  {
    if (x > j) {
      break;
    }
    if (this.matrix[(i + x)][(j - x)] == 0) {
      break;
    }
    if (this.matrix[(i + x)][(j - x)] == p2)
    {
      c = (c + 1);
      if (this.matrix[(i + x + 1)][(j - x - 1)] == p1)
      {
        while (c > 0)
        {
          this.setValue((i + x - c + 1), (j - x + c - 1), p1);
          c = (c - 1);
        }
      }
    }
  }

  c = 0;

  for (var x = 1; x <= 8; x = (x + 1))
  {
    if (x > i) {
      break;
    }
    if (this.matrix[(i - x)][(j + x)] == 0) {
      break;
    }
    if (this.matrix[(i - x)][(j + x)] == p2)
    {
      c = (c + 1);
      if (this.matrix[(i - x - 1)][(j + x + 1)] == p1)
      {
        while (c > 0)
        {
          this.setValue((i - x + c - 1), (j + x - c + 1), p1);
          c = (c - 1);
        }
      }
    }
  }

  c = 0;

  for (var x = 1; x <= 8; x = (x + 1))
  {
    if ((x > i) || (x > i)) {
      break;
    }
    if (this.matrix[(i - x)][(j - x)] == 0) {
      break;
    }
    if (this.matrix[(i - x)][(j - x)] == p2)
    {
      c = (c + 1);
      if (this.matrix[(i - x - 1)][(j - x - 1)] == p1)
      {
        while (c > 0)
        {
          this.setValue((i - x + c - 1), (j - x + c - 1), p1);
          c = (c - 1);
        }
      }
    }
  }

  c = 0;
};
