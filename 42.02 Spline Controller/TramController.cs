using UnityEngine;
using UnityEngine.Splines;

public class TramController : MonoBehaviour
{
    public SplineContainer spline; 
    public float speed = 5f; 
    private float progress = 0f; 

    void Update()
    {
        progress += speed * Time.deltaTime; 
        progress = Mathf.Clamp(progress, 0f, 1f);
        Vector3 position = spline.EvaluatePosition(progress); 
        Vector3 tangent = spline.EvaluateTangent(progress); 
      
        Quaternion rotation = Quaternion.LookRotation(tangent);

       
        transform.position = position;
        transform.rotation = rotation;
    }
}
