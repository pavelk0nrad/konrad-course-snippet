public GameObject player;
private Vector3 offset = new Vector3(0, 5, -7);
void Update()
{
transform.position = player.transform.position + offset;
}
