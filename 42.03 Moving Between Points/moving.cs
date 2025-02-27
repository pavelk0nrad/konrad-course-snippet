using UnityEngine;

public class MoveBetweenPoints : MonoBehaviour
{
    public Transform pointA;
    public Transform pointB;
    public float speed = 2.0f;
    private float t = 0.0f;
    private bool movingToB = true;

    void Update()
    {
        if (movingToB)
        {
            t += Time.deltaTime * speed;
            if (t >= 1.0f)
            {
                t = 1.0f;
                movingToB = false;
            }
        }
        else
        {
            t -= Time.deltaTime * speed;
            if (t <= 0.0f)
            {
                t = 0.0f;
                movingToB = true;
            }
        }
        transform.position = Vector3.Lerp(pointA.position, pointB.position, t);
    }
}
